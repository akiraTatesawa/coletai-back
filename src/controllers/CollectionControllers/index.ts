import { CollectionRepository } from "../../repositories/prisma/CollectionRepository";
import { UserRepository } from "../../repositories/prisma/UserRepository";
import { CooperativeRepository } from "../../repositories/prisma/CooperativeRepository";
import { ValidateUserByIdService } from "../../services/UserServices/ValidateUserByIdService";
import { GetCooperativesLocationService } from "../../services/CooperativeServices/GetCooperativesLocationService";
import { CreateCollectionService } from "../../services/CollectionServices/CreateCollectionService";
import { CreateCollectionController } from "./CreateCollectionController";
import { RecyclingTypesRepository } from "../../repositories/prisma/RecyclingTypesRepository";
import { ValidateTypesService } from "../../services/RecyclingTypesServices/ValidateTypesService";
import { ListCollectionsByIdService } from "../../services/CollectionServices/ListCollectionsByIdService";
import { ListCollectionsByUserIdController } from "./ListCollectionsByUserIdController";
import { ListCollectionsByCooperativeIdController } from "./ListCollectionsByCooperativeIdController";
import { CancelCollectionService } from "../../services/CollectionServices/CancelCollectionService";
import { CancelCollectionController } from "./CancelCollectionController";

function setCollectionRepository() {
  return new CollectionRepository();
}

export function createCollectionController() {
  const collectionRepository = setCollectionRepository();
  const userRepository = new UserRepository();
  const cooperativeRepository = new CooperativeRepository();
  const recyclingTypesRepository = new RecyclingTypesRepository();

  const validateUserService = new ValidateUserByIdService(userRepository);
  const validateTypesService = new ValidateTypesService(
    recyclingTypesRepository
  );
  const getCooperativesLocationService = new GetCooperativesLocationService(
    cooperativeRepository
  );

  const createCollectionService = new CreateCollectionService(
    validateUserService,
    getCooperativesLocationService,
    validateTypesService,
    collectionRepository
  );

  return new CreateCollectionController(createCollectionService);
}

export function listCollectionsByUserIdController() {
  const collectionRepository = setCollectionRepository();
  const service = new ListCollectionsByIdService(collectionRepository);

  return new ListCollectionsByUserIdController(service);
}

export function listCollectionsByCooperativeIdController() {
  const collectionRepository = setCollectionRepository();
  const service = new ListCollectionsByIdService(collectionRepository);

  return new ListCollectionsByCooperativeIdController(service);
}

export function cancelCollectionController() {
  const collectionRepository = setCollectionRepository();
  const service = new CancelCollectionService(collectionRepository);

  return new CancelCollectionController(service);
}
