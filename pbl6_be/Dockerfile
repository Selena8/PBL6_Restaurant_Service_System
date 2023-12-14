#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["pbl6_be.csproj", "."]
RUN dotnet restore "./pbl6_be.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "pbl6_be.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "pbl6_be.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
COPY --from=build /src/Common/MailTemplates /app/Common/MailTemplates
ENV TZ="Asia/Ho_Chi_Minh"
RUN date
ENTRYPOINT ["dotnet", "pbl6_be.dll"]
