// export class Drops {
//   private DropsService: DropsService;

//   constructor(DropsProvider: DropsProvider) {
//     this.DropsService = new DropsService(DropsProvider);
//   }

//   async paginatedDrops(
//     input: PaginatedDropsInput,
//   ): Promise<PaginatedResult<Drop>> {
//     return this.DropsService.paginatedDrops(input);
//   }

//   async fetchDrop(input: FetchDropInput): Promise<Drop | null> {
//     return this.DropsService.fetchDrop(input);
//   }
// }
