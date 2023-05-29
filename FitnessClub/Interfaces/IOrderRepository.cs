using FitnessClub.Models;

namespace FitnessClub.Interfaces
{
    public interface IOrderRepository
    {
        Task AddSubscription(OrderDTO orderDTO);
        Task<IEnumerable<Order>> GetOrders();
        Task<IEnumerable<Order>> GetOrdersFromTill(DateOnly? ordersDateFrom, DateOnly? ordersDateTill);
        Task<IEnumerable<Order>> GetOrdersByUser(string userFirstName, string userLastName);
        Task DeleteOrder(int orderId);
    }
}
