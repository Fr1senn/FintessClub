using FitnessClub.Interfaces;
using FitnessClub.Models;
using Microsoft.EntityFrameworkCore;

namespace FitnessClub.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly FitnessClubContext _context;

        public OrderRepository(FitnessClubContext context)
        {
            _context = context;
        }

        public async Task AddSubscription(OrderDTO orderDTO)
        {
            Subscription? subscription = await _context.Subscriptions.FindAsync(orderDTO.SubscriptionId);
            if (subscription is null)
                throw new NullReferenceException("Subscription does not exist");

            User? user = await _context.Users
                .Include(u => u.Orders)
                .FirstOrDefaultAsync(u => u.Id == orderDTO.UserId);
            if (user is null)
                throw new NullReferenceException("user does not exist");

            if (user.Orders.FirstOrDefault(o =>
                    o.SubscriptionId == orderDTO.SubscriptionId && o.UserId == orderDTO.UserId) is not null)
            {
                var currentDate = DateTime.Now;
                var expirationDate = currentDate.AddDays(orderDTO.DaysAmount);
                if (currentDate < expirationDate)
                    throw new InvalidOperationException("You already have this subscription");
            }

            await _context.Orders.AddAsync(new Order
            {
                UserId = orderDTO.UserId,
                SubscriptionId = orderDTO.SubscriptionId,
                DaysAmount = orderDTO.DaysAmount
            });

            Wishlist? wishlist = await _context.Wishlists
                .FirstOrDefaultAsync(w => w.UserId == orderDTO.UserId && w.SubscriptionId == orderDTO.SubscriptionId);

            if (wishlist is not null) _context.Remove(wishlist);

            await _context.SaveChangesAsync();
        }

        public async Task DeleteOrder(int orderId)
        {
            Order? order = await _context.Orders.FirstOrDefaultAsync(o => o.Id == orderId);
            if (order is null)
                throw new NullReferenceException("Order does not exist");
            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Order>> GetOrders()
        {
            List<Order> orders = await _context.Orders
                .Include(o => o.User)
                .Include(o => o.Subscription)
                .AsNoTracking()
                .ToListAsync();
            return orders;
        }

        public async Task<IEnumerable<Order>> GetOrdersByUser(string userFirstName, string userLastName)
        {
            User? user = await _context.Users.FirstOrDefaultAsync(u => u.FirstName == userFirstName && u.LastName == userLastName);

            if (user is null)
                throw new NullReferenceException("User does not exist");

            List<Order> orders = await _context.Orders
                .Include(o => o.User)
                .Include(o => o.Subscription)
                .Where(o => o.User == user)
                .AsNoTracking()
                .ToListAsync();
            return orders;
        }

        public async Task<IEnumerable<Order>> GetOrdersFromTill(DateOnly? ordersDateFrom, DateOnly? ordersDateTill)
        {
            ordersDateFrom ??= DateOnly.MinValue;
            ordersDateTill ??= DateOnly.MaxValue;

            List<Order> orders = await _context.Orders
                .Include(o => o.User)
                .Include(o => o.Subscription)
                .Where(o => o.PurchaseDate >= ordersDateFrom && o.PurchaseDate <= ordersDateTill)
                .AsNoTracking()
                .ToListAsync();
            return orders;
        }
    }
}
