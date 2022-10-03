import { Collections, User } from "@prisma/client";
import { IServiceExecute } from "../../@types/ServiceTypes";
import { CollectionRequest } from "../../@types/CollectionTypes";
import { IValidateUserByIdService } from "../UserServices/ValidateUserByIdService";
import { IGetCooperativesLocationService } from "../CooperativeServices/GetCooperativesLocationService";
import { ICollectionRepository } from "../../repositories/ICollectionRepository";
import { CooperativeLocation } from "../../@types/CooperativeTypes";
import { Collection } from "../../entities/Collection";
import { IValidateTypesService } from "../RecyclingTypesServices/ValidateTypesService";

export interface ICreateCollectionService
  extends IServiceExecute<CollectionRequest, Collections> {}

export class CreateCollectionService implements ICreateCollectionService {
  private validateUserService: IValidateUserByIdService;

  private getCooperativesLocationService: IGetCooperativesLocationService;

  private validateTypesService: IValidateTypesService;

  private repository: ICollectionRepository;

  constructor(
    validateUserService: IValidateUserByIdService,
    getCooperativesLocationService: IGetCooperativesLocationService,
    validateTypesService: IValidateTypesService,
    repository: ICollectionRepository
  ) {
    this.validateUserService = validateUserService;
    this.getCooperativesLocationService = getCooperativesLocationService;
    this.validateTypesService = validateTypesService;
    this.repository = repository;
  }

  private calculateDistance(
    { latitude: userLat, longitude: userLon }: User,
    { latitude: cooperativeLat, longitude: cooperativeLon }: CooperativeLocation
  ) {
    const piRatio = Math.PI / 180;
    const { cos } = Math;
    const MathA =
      0.5 -
      cos((cooperativeLat - userLat) * piRatio) / 2 +
      (cos(userLat * piRatio) *
        cos(cooperativeLat * piRatio) *
        (1 - cos((cooperativeLon - userLon) * piRatio))) /
        2;

    return 12742 * Math.asin(Math.sqrt(MathA));
  }

  private searchClosestCooperative(
    userData: User,
    cooperatives: CooperativeLocation[]
  ): string {
    const cooperativesDistanceHash: { [id: string]: number } = {};

    for (let i = 0; i < cooperatives.length; i++) {
      cooperativesDistanceHash[cooperatives[i].id] = this.calculateDistance(
        userData,
        cooperatives[i]
      );
    }

    let closestCooperativeId: string = cooperatives[0].id;
    let closestDistance: number = cooperativesDistanceHash[cooperatives[0].id];

    for (let j = 0; j < cooperatives.length; j++) {
      if (cooperativesDistanceHash[cooperatives[j].id] < closestDistance) {
        closestCooperativeId = cooperatives[j].id;
        closestDistance = cooperativesDistanceHash[cooperatives[j].id];
      }
    }

    return closestCooperativeId;
  }

  async execute(data: CollectionRequest): Promise<Collections> {
    const user = await this.validateUserService.execute({ id: data.userId });
    await this.validateTypesService.execute(data.types);
    const cooperatives = await this.getCooperativesLocationService.execute();
    const closestCooperativeId = this.searchClosestCooperative(
      user,
      cooperatives
    );

    const newCollection = new Collection(
      closestCooperativeId,
      user.id,
      data.types
    );

    return this.repository.insert(newCollection);
  }
}