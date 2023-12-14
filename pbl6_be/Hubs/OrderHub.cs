using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace pbl6_be.Hubs
{
    public interface ITypedHubClient
    {
        Task SendNotification(string cmd);
    }

    public class OrderHub : Hub<ITypedHubClient>
    {
        private ILogger<OrderHub> _logger;
        public OrderHub(ILogger<OrderHub> logger)
        {
            this._logger = logger;
        }
        public override Task OnConnectedAsync()
        {
            _logger.LogInformation("New Connection");
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            _logger.LogInformation("Disconnect" + exception?.Message);
            return base.OnDisconnectedAsync(exception);
        }
    }
}