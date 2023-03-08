using System.ComponentModel.DataAnnotations;

namespace FitnessClub.Models;

public class LoginModel
{
    [EmailAddress] public string Email { get; set; } = String.Empty;

    [MinLength(8)]
    [RegularExpression("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*#?&_])[A-Za-z\\d@$!%*#?&_]{8,}$",
        ErrorMessage =
            "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character")]
    [DataType(DataType.Password)]
    public string Password { get; set; } = String.Empty;
}

public class RegisterModel
{
    [Required]
    [MinLength(2)]
    [MaxLength(100)]
    [RegularExpression("^[a-zA-Z]([a-zA-Z]| |-|')*$",
        ErrorMessage = "The first name has to start with a letter and consist only of letters, space, - or '")]
    public string FirstName { get; set; } = String.Empty;
    [Required]
    [MinLength(2)]
    [MaxLength(100)]
    [RegularExpression("^[a-zA-Z]([a-zA-Z]| |-|')*$",
        ErrorMessage = "The last name has to start with a letter and consist only of letters, space, - or '")]
    public string LastName { get; set; } = String.Empty;
    [Required]
    [MaxLength(320)]
    [EmailAddress]
    public string Email { get; set; } = String.Empty;
    [Required]
    [MinLength(8)]
    [RegularExpression("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*#?&_])[A-Za-z\\d@$!%*#?&_]{8,}$",
        ErrorMessage = "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character")]
    public string Password { get; set; } = String.Empty;
    [Required]
    public DateOnly Birthdate { get; set; }
    public int Roleid { get; set; } = 1;
}