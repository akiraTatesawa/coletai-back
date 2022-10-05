import { randPastDate, randUuid } from "@ngneat/falso";
import { RecyclingTypes } from "@prisma/client";
import { RecyclingType } from "../../src/@types/CollectionTypes";

export class RecyclingTypesFactory {
  generateTypes(): RecyclingTypes[] {
    return [
      { id: randUuid(), name: "Plástico", created_at: randPastDate() },
      { id: randUuid(), name: "Papel", created_at: randPastDate() },
      { id: randUuid(), name: "Vidro", created_at: randPastDate() },
      { id: randUuid(), name: "Metal", created_at: randPastDate() },
    ];
  }

  generateValidType(): RecyclingType[] {
    return [{ name: "Plástico" }];
  }

  generateInvalidType(): RecyclingType[] {
    return [{ name: "Invalid" }];
  }
}
