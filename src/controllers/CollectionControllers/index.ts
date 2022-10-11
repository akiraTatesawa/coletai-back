import { CollectionRepository } from "../../repositories/prisma/CollectionRepository";
import { UserRepository } from "../../repositories/prisma/UserRepository";
import { CooperativeRepository } from "../../repositories/prisma/CooperativeRepository";
import { RecyclingTypesRepository } from "../../repositories/prisma/RecyclingTypesRepository";

import { ValidateUserByIdServiceImpl } from "../../services/UserServices/ValidateUserByIdService";
import { GetCooperativesLocationServiceImpl } from "../../services/CooperativeServices/GetCooperativesLocationService";
import { CreateCollectionServiceImpl } from "../../services/CollectionServices/CreateCollectionService";
import { FinishCollectionServiceImpl } from "../../services/CollectionServices/FinishCollectionService";
import { ValidateTypesServiceImpl } from "../../services/RecyclingTypesServices/ValidateTypesService";
import { ListCollectionsByIdServiceImpl } from "../../services/CollectionServices/ListCollectionsByIdService";
import { CancelCollectionServiceImpl } from "../../services/CollectionServices/CancelCollectionService";

import { ListCollectionsByUserIdController } from "./ListCollectionsByUserIdController";
import { ListCollectionsByCooperativeIdController } from "./ListCollectionsByCooperativeIdController";
import { CancelCollectionController } from "./CancelCollectionController";
import { FinishCollectionController } from "./FinishCollectionController";
import { CreateCollectionController } from "./CreateCollectionController";

function setCollectionRepository() {
  return new CollectionRepository();
}

export function createCollectionController() {
  const collectionRepository = setCollectionRepository();
  const userRepository = new UserRepository();
  const cooperativeRepository = new CooperativeRepository();
  const recyclingTypesRepository = new RecyclingTypesRepository();

  const validateUserService = new ValidateUserByIdServiceImpl(userRepository);
  const validateTypesService = new ValidateTypesServiceImpl(
    recyclingTypesRepository
  );
  const getCooperativesLocationService = new GetCooperativesLocationServiceImpl(
    cooperativeRepository
  );

  const createCollectionService = new CreateCollectionServiceImpl(
    validateUserService,
    getCooperativesLocationService,
    validateTypesService,
    collectionRepository
  );

  return new CreateCollectionController(createCollectionService);
}

export function listCollectionsByUserIdController() {
  const collectionRepository = setCollectionRepository();
  const service = new ListCollectionsByIdServiceImpl(collectionRepository);

  return new ListCollectionsByUserIdController(service);
}

export function listCollectionsByCooperativeIdController() {
  const collectionRepository = setCollectionRepository();
  const service = new ListCollectionsByIdServiceImpl(collectionRepository);

  return new ListCollectionsByCooperativeIdController(service);
}

export function cancelCollectionController() {
  const collectionRepository = setCollectionRepository();
  const service = new CancelCollectionServiceImpl(collectionRepository);

  return new CancelCollectionController(service);
}

export function finishCollectionController() {
  const collectionRepository = setCollectionRepository();
  const service = new FinishCollectionServiceImpl(collectionRepository);

  return new FinishCollectionController(service);
}
