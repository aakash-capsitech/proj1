using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace AuthenticationApp.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = ObjectId.GenerateNewId().ToString();
        
        [Required]
        [BsonElement("username")]
        public string Username { get; set; } = string.Empty;
        
        [Required]
        [EmailAddress]
        [BsonElement("email")]
        public string Email { get; set; } = string.Empty;
        
        [Required]
        [BsonElement("passwordHash")]
        public string PasswordHash { get; set; } = string.Empty;
        
        [Required]
        [BsonElement("role")]
        public string Role { get; set; } = "User";
        
        [BsonElement("createdAt")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}