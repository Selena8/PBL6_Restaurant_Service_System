using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;
using pbl6_be.Domain.ModelSetting;
using pbl6_be.Domain.ModelSettings;
using pbl6_be.Transfers.DTOs;

namespace pbl6_be.Services
{
    public class UploadFileService : IUploadFileService
    {
        private readonly Cloudinary _cloudinary;
        private readonly CloudinarySettings _cloudinarySettings;
        
        public UploadFileService(IOptions<CloudinarySettings> cloudinarySettings)
        {
            _cloudinarySettings = cloudinarySettings.Value;
            _cloudinary = new Cloudinary(new Account(_cloudinarySettings.CloudName, _cloudinarySettings.ApiKey, _cloudinarySettings.ApiSecret));
        }

        public async Task<UploadFileResponse> UploadFile(UploadFileDto dt)
        {
            try
            {
                if (dt.File == null || dt.File.Length == 0)
                {
                    throw new Exception("File is not valid");
                }
                IFormatProvider provider = CultureInfo.CreateSpecificCulture("en-US");
                var result = await _cloudinary.UploadAsync(new ImageUploadParams
                {
                    File = new FileDescription(dt.File.FileName,
                    dt.File.OpenReadStream()),
                }).ConfigureAwait(false);
                return new UploadFileResponse() { Url = result.Url.AbsoluteUri, Status = UploadFileStatus.Sucess };
            }
            catch (System.Exception)
            {
                throw;
            }
        }
    }
}