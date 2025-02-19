using Microsoft.AspNetCore.Mvc;
using ShopGameDD.Models;
using ShopGameDD.Repositories.bundle;
using ShopGameDD.Repositories.order_detail;
using ShopGameDD.Repositories.user;
using ShopGameDD.Requests.bundle;
using ShopGameDD.Requests.payment;

namespace ShopGameDD.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class PaymentController : ControllerBase
{
    private readonly IPaymentRepository _IPaymentRepository;
    private readonly IUserRepository _UserRepository;
    public PaymentController(IPaymentRepository paymentRepository,IUserRepository userRepository)
    {
        _IPaymentRepository = paymentRepository;
        _UserRepository = userRepository;
    }

    [HttpGet("{userid}")]
    public async Task<IActionResult> GetPaymentByUserId(string userid)
    {
        User user = await _UserRepository.GetAsync(userid);

        if (user is null)
        {
            return BadRequest("User Not Found");
        }

        IEnumerable<Payment> payments = await _IPaymentRepository.GetPaymentsByUserId(userid);

        return Ok(payments);
    }

    [HttpGet]
    public async Task<IActionResult> GetAllPayinRequest()
    {   

        IEnumerable<Payment> payments = await _IPaymentRepository.GetsAsync();

        List<object> listUserPayinRq = new List<object>();

        foreach (var payment in payments)
        {   

            User user = await _UserRepository.GetAsync(payment.UserId);

            listUserPayinRq.Add(new {
                user,
                payment
            });
        }

        return Ok(listUserPayinRq);
    }

    [HttpPost]
    public async Task<IActionResult> CreatePayment(CreatePaymentRq rq)
    {
        User user = await _UserRepository.GetAsync(rq.UserId);

        if (user is null)
        {
            return BadRequest("User Not Found");
        }

        Payment payment = new Payment{
            UserId = rq.UserId,
            TelecomName = rq.TelecomName,
            seri = rq.seri,
            code = rq.code,
            faceValue = rq.faceValue,
            Status = rq.Status,
            Time = rq.Time
        };

        await _IPaymentRepository.CreateAsync(payment);

        return Ok("Create Success");
    }

    [HttpPut("{paymentid}")]
    public async Task<IActionResult> setPaymentStatusCanceled(string paymentid)
    {
        Payment payment = await _IPaymentRepository.GetAsync(paymentid);

        if (payment is null)
        {
            return BadRequest("payment Not Found");
        }

        payment.Status = "Canceled";
        await _IPaymentRepository.UpdateAsync(payment.Id,payment);

        return Ok("Create Success");
    }

    [HttpPut("{userid}/{paymentid}")]
    public async Task<IActionResult> AcceptPayment(string userid,string  paymentid)
    {
        Payment payment = await _IPaymentRepository.GetAsync(paymentid);
        User user = await _UserRepository.GetAsync(userid);
        User admin1 = await _UserRepository.GetAsync("677795aa55326904548a140d");

        if (user is null)
        {
            return BadRequest("User Not Found");
        }

        if (payment is null)
        {
            return BadRequest("payment Not Found");
        }


        decimal eightPercent = payment.faceValue * 0.08m;
        decimal remaining = payment.faceValue - eightPercent;

        user.Wallet += remaining;
        admin1.Wallet += eightPercent;
        payment.Status = "Success";
        await _IPaymentRepository.UpdateAsync(payment.Id,payment);
        await _UserRepository.UpdateAsync(user.Id,user);
        await _UserRepository.UpdateAsync(admin1.Id,admin1);

        return Ok("Create Success");
    }
}