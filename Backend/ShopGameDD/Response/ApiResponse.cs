namespace ShopGameDD.Response;

public class ApiResponse<T>
{
    public string? Message { get; set; }
    public T? Data { get; set; }
}