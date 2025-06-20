using MongoDB.Driver;
using AuthenticationApp.Models;
using Microsoft.Extensions.Options;

namespace AuthenticationApp.Data
{
    public class MongoDbContext
    {
        private readonly IMongoDatabase _database;

        public MongoDbContext(IOptions<DatabaseSettings> databaseSettings)
        {
            var client = new MongoClient(databaseSettings.Value.ConnectionString);
            _database = client.GetDatabase(databaseSettings.Value.DatabaseName);
        }

        public IMongoCollection<User> Users => 
            _database.GetCollection<User>("Users");
    }
}