class Champion extends Entity
{
  data = {};
  constructor(repository, data) {
    super(repository);
    this.data = data;
  }

  getId() {
    return this.data.key;
  }

  getName() {
    return this.data.id;
  }

  getSplash() {
    return this.repository.getChampionSplash(this.getName());
  }
}