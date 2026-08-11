FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base

WORKDIR /app

EXPOSE 8080

ENV ASPNETCORE_URLS=http://+:8080


FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build

WORKDIR /src

COPY ["backend/ProvaWeb.Api/ProvaWeb.Api.csproj", "backend/ProvaWeb.Api/"]
COPY ["backend/ProvaWeb.Application/ProvaWeb.Application.csproj", "backend/ProvaWeb.Application/"]
COPY ["backend/ProvaWeb.Domain/ProvaWeb.Domain.csproj", "backend/ProvaWeb.Domain/"]
COPY ["backend/ProvaWeb.Infrastructure/ProvaWeb.Infrastructure.csproj", "backend/ProvaWeb.Infrastructure/"]

RUN dotnet restore "backend/ProvaWeb.Api/ProvaWeb.Api.csproj"

COPY . .

WORKDIR "/src/backend/ProvaWeb.Api"

RUN dotnet publish "ProvaWeb.Api.csproj" \
    -c Release \
    -o /app/publish \
    /p:UseAppHost=false


FROM base AS final

WORKDIR /app

COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "ProvaWeb.Api.dll"]