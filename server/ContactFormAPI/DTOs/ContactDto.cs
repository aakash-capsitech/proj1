// DTOs/ContactDto.cs
using System.ComponentModel.DataAnnotations;

namespace ContactFormAPI.DTOs
{
    public class CreateContactDto
    {
        [Required(ErrorMessage = "Name is required")]
        [StringLength(100, ErrorMessage = "Name cannot exceed 100 characters")]
        [RegularExpression(@"^[a-zA-Z\s]+$", ErrorMessage = "Name must only contain letters and spaces")]
        public string Name { get; set; } = string.Empty;
        
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Please enter a valid email address")]
        [StringLength(255, ErrorMessage = "Email cannot exceed 255 characters")]
        public string Email { get; set; } = string.Empty;
        
        [Required(ErrorMessage = "Phone number is required")]
        [RegularExpression(@"^[0-9]{10}$", ErrorMessage = "Phone number must be 10 digits")]
        public string Phone { get; set; } = string.Empty;
        
        [Required(ErrorMessage = "Message is required")]
        [StringLength(300, ErrorMessage = "Message cannot exceed 300 characters")]
        public string Message { get; set; } = string.Empty;
    }
    
    public class ContactResponseDto
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }
}