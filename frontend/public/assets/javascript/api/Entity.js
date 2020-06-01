class Entity
{
  repository = null;


  constructor(repository) {
    this.repository = repository;
  }

  getRepository() {
    return this.repository;
  }
  
}