export class CommandJournal {
  async log(entry: any): Promise<void> {
    console.log('📊 Command Journal Entry:', entry);
  }
}
