using ShopGameDD.Models;

namespace ShopGameDD.Requests.payment;
public class CreatePaymentRq
{
    public required string UserId { get; set; }
    public required string Status { get; set; }
    public required string TelecomName { get; set; }
    public required string seri { get; set; }
    public required string code { get; set; }
    public required decimal faceValue { get; set; }
    public required DateTime Time { get; set; }
}