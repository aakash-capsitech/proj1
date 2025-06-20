// Data/MongoDbContext.cs
using MongoDB.Driver;
using ContactFormAPI.Models;

namespace ContactFormAPI.Data
{
    public class MongoDbContext
    {
        private readonly IMongoDatabase _database;
        
        public MongoDbContext(IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("MongoDB");
            var mongoClient = new MongoClient(connectionString);
            _database = mongoClient.GetDatabase("ContactFormDB");
        }
        
        public IMongoCollection<Contact> Contacts => _database.GetCollection<Contact>("contacts");
    }
}