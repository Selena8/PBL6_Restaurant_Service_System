using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pbl6_be.Transfers.DTOs
{
    public enum UploadFileStatus
    {
        Sucess,
        Error
    }

    public class UploadFileResponse
    {
        public string Url {get; set;}
        public UploadFileStatus Status {get; set;}
    }
}