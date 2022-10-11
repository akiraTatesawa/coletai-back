import {
  randCompanyName,
  randEmail,
  randFullAddress,
  randLatitude,
  randLongitude,
  randPassword,
  randUserName,
} from "@ngneat/falso";
import { PrismaClient } from "@prisma/client";
import chalk from "chalk";
import { CreateUserPrisma } from "../src/@types/UserTypes";
import { User } from "../src/entities/User";
import { CryptUtils, ICryptUtils } from "../src/utils/CryptUtils";
import { CreateCooperativePrisma } from "../src/@types/CooperativeTypes";
import { Cooperative } from "../src/entities/Cooperative";

interface ISeed {
  main(): Promise<void>;
}
class Seed implements ISeed {
  private prisma: PrismaClient = new PrismaClient();

  private cryptUtils: ICryptUtils = new CryptUtils();

  private createUser(): User {
    const data: CreateUserPrisma = {
      name: randUserName(),
      email: randEmail(),
      password: randPassword(),
      latitude: randLatitude(),
      longitude: randLongitude(),
      address: randFullAddress(),
    };

    return new User(data, this.cryptUtils);
  }

  private createCooperative(): Cooperative {
    const data: CreateCooperativePrisma = {
      name: randCompanyName(),
      email: randEmail(),
      password: randPassword(),
      latitude: randLatitude(),
      longitude: randLongitude(),
      address: randFullAddress(),
    };

    return new Cooperative(data, this.cryptUtils);
  }

  async main(): Promise<void> {
    try {
      console.log(chalk.red("\nTruncating all tables..."));
      await this.prisma
        .$queryRaw`TRUNCATE TABLE users RESTART IDENTITY CASCADE;`;
      await this.prisma
        .$queryRaw`TRUNCATE TABLE cooperatives RESTART IDENTITY CASCADE;`;
      await this.prisma
        .$queryRaw`TRUNCATE TABLE collections RESTART IDENTITY CASCADE;`;
      await this.prisma
        .$queryRaw`TRUNCATE TABLE recycling_types RESTART IDENTITY CASCADE;`;
      console.log(chalk.green("OK!"));

      console.log(chalk.yellow("\nInserting users..."));
      await this.prisma.user.createMany({
        data: [this.createUser(), this.createUser(), this.createUser()],
      });
      console.log(chalk.green("OK!"));

      console.log(chalk.yellow("\nInserting cooperatives..."));
      await this.prisma.cooperative.createMany({
        data: [
          this.createCooperative(),
          this.createCooperative(),
          this.createCooperative(),
        ],
      });
      console.log(chalk.green("OK!"));

      console.log(chalk.yellow("\nInserting recycling types..."));
      await this.prisma.recyclingTypes.createMany({
        data: [
          { name: "Plástico" },
          { name: "Papel" },
          { name: "Vidro" },
          { name: "Metal" },
        ],
      });
      console.log(chalk.green("OK!"));
    } catch (e) {
      console.error(e);
      process.exit(1);
    } finally {
      await this.prisma.$disconnect();
    }
  }
}

new Seed().main();
