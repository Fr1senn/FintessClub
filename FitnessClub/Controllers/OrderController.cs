using FitnessClub.Interfaces;
using FitnessClub.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FitnessClub.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class OrderController : ControllerBase
    {
        private readonly IOrderRepository _orderRepository;

        public OrderController(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        [HttpPost("BuySubscription")]
        [Authorize(Roles = "admin, manager")]
        public async Task<IActionResult> BuySubscription([FromBody] OrderDTO orderData)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest(ModelState);

                await _orderRepository.AddSubscription(orderData);

                return Ok();
            }
            catch (NullReferenceException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetOrders")]
        [Authorize(Roles = "admin, manager")]
        public async Task<IActionResult> GetOrders()
        {
            List<Order> orders = (await _orderRepository.GetOrders()).ToList();
            return Ok(orders);
        }

        [HttpGet("GetOrdersFromTill")]
        [Authorize(Roles = "admin, manager")]
        public async Task<IActionResult> GetAttendanceFromTill([FromQuery] DateOnly? ordersDateFrom, [FromQuery] DateOnly? ordersDateTill)
        {
            List<Order> orders = (await _orderRepository.GetOrdersFromTill(ordersDateFrom, ordersDateTill)).ToList();
            return Ok(orders);
        }

        [HttpGet("GetOrdersByUser")]
        [Authorize(Roles = "manager")]
        public async Task<IActionResult> GetOrdersByUser([FromQuery] string userFirstName, [FromQuery] string userLastName)
        {
            try
            {
                List<Order> orders = (await _orderRepository.GetOrdersByUser(userFirstName, userLastName)).ToList();
                return Ok(orders);
            }
            catch (NullReferenceException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("DeleteOrder")]
        [Authorize(Roles = "admin, manager")]
        public async Task<IActionResult> DeleteOrder([FromQuery] int orderId)
        {
            try
            {
                await _orderRepository.DeleteOrder(orderId);
                return Ok();
            }
            catch (NullReferenceException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}