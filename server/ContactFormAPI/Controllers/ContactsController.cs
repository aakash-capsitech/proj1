// Controllers/ContactsController.cs
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using MongoDB.Bson;
using ContactFormAPI.Data;
using ContactFormAPI.Models;
using ContactFormAPI.DTOs;

namespace ContactFormAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactsController : ControllerBase
    {
        private readonly MongoDbContext _context;
        
        public ContactsController(MongoDbContext context)
        {
            _context = context;
        }
        
        // GET: api/contacts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContactResponseDto>>> GetContacts()
        {
            try
            {
                var contacts = await _context.Contacts
                    .Find(_ => true)
                    .SortByDescending(c => c.CreatedAt)
                    .ToListAsync();
                
                var contactDtos = contacts.Select(c => new ContactResponseDto
                {
                    Id = c.Id ?? string.Empty,
                    Name = c.Name,
                    Email = c.Email,
                    Phone = c.Phone,
                    Message = c.Message,
                    CreatedAt = c.CreatedAt
                }).ToList();
                
                return Ok(contactDtos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while retrieving contacts", error = ex.Message });
            }
        }
        
        // GET: api/contacts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ContactResponseDto>> GetContact(string id)
        {
            try
            {
                if (!ObjectId.TryParse(id, out _))
                {
                    return BadRequest(new { message = "Invalid contact ID format" });
                }
                
                var contact = await _context.Contacts
                    .Find(c => c.Id == id)
                    .FirstOrDefaultAsync();
                
                if (contact == null)
                {
                    return NotFound(new { message = "Contact not found" });
                }
                
                var contactDto = new ContactResponseDto
                {
                    Id = contact.Id ?? string.Empty,
                    Name = contact.Name,
                    Email = contact.Email,
                    Phone = contact.Phone,
                    Message = contact.Message,
                    CreatedAt = contact.CreatedAt
                };
                
                return Ok(contactDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while retrieving the contact", error = ex.Message });
            }
        }

        [HttpPost]
        public async Task<ActionResult<object>> CreateContact([FromBody] CreateContactDto createContactDto)
        {
            Console.WriteLine("? Entered CreateContact");

            if (!ModelState.IsValid)
            {
                Console.WriteLine("?? ModelState is invalid");

                var errors = ModelState
                    .Where(x => x.Value.Errors.Count > 0)
                    .ToDictionary(
                        kvp => kvp.Key,
                        kvp => kvp.Value.Errors.Select(e => e.ErrorMessage).ToArray()
                    );

                return Ok(new
                {
                    success = false,
                    message = "Validation failed",
                    errors
                });
            }

            // continue with insertion logic...
            try
            {
                if (!ModelState.IsValid)
                {
                    Console.WriteLine("Debug message: Something happened here.");

                    var errors = ModelState
                        .Where(kvp => kvp.Value.Errors.Count > 0)
                        .ToDictionary(
                            kvp => kvp.Key,
                            kvp => kvp.Value.Errors.Select(e => e.ErrorMessage).ToArray()
                        );

                    return Ok(new { success = false, errors });
                }

                var contact = new Contact
                {
                    Name = createContactDto.Name.Trim(),
                    Email = createContactDto.Email.Trim(),
                    Phone = createContactDto.Phone.Trim(),
                    Message = createContactDto.Message.Trim(),
                    CreatedAt = DateTime.UtcNow
                };

                await _context.Contacts.InsertOneAsync(contact);

                var contactResponse = new ContactResponseDto
                {
                    Id = contact.Id ?? string.Empty,
                    Name = contact.Name,
                    Email = contact.Email,
                    Phone = contact.Phone,
                    Message = contact.Message,
                    CreatedAt = contact.CreatedAt
                };

                return CreatedAtAction(nameof(GetContact), new { id = contact.Id }, contactResponse);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while creating the contact", error = ex.Message });
            }
        }


        // PUT: api/contacts/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateContact(string id, CreateContactDto updateContactDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            try
            {
                if (!ObjectId.TryParse(id, out _))
                {
                    return BadRequest(new { message = "Invalid contact ID format" });
                }
                
                var update = Builders<Contact>.Update
                    .Set(c => c.Name, updateContactDto.Name.Trim())
                    .Set(c => c.Email, updateContactDto.Email.Trim())
                    .Set(c => c.Phone, updateContactDto.Phone.Trim())
                    .Set(c => c.Message, updateContactDto.Message.Trim());
                
                var result = await _context.Contacts.UpdateOneAsync(
                    c => c.Id == id, 
                    update
                );
                
                if (result.MatchedCount == 0)
                {
                    return NotFound(new { message = "Contact not found" });
                }
                
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while updating the contact", error = ex.Message });
            }
        }
        
        // DELETE: api/contacts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(string id)
        {
            try
            {
                if (!ObjectId.TryParse(id, out _))
                {
                    return BadRequest(new { message = "Invalid contact ID format" });
                }
                
                var result = await _context.Contacts.DeleteOneAsync(c => c.Id == id);
                
                if (result.DeletedCount == 0)
                {
                    return NotFound(new { message = "Contact not found" });
                }
                
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while deleting the contact", error = ex.Message });
            }
        }
    }
}