using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using pbl6_be.Transfers.DTOs;

namespace pbl6_be.Services
{
    public interface IUploadFileService
    {
        Task<UploadFileResponse> UploadFile(UploadFileDto dt);
    }
}