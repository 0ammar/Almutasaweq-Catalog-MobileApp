# Use official .NET runtime as base
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app

# Build stage using SDK image
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy only .csproj and restore first (optional optimization)
COPY *.csproj ./
RUN dotnet restore

# Copy the rest of the files and build
COPY . .
# Remove Dockerfile to avoid it being included as source
RUN rm -f Dockerfile
RUN dotnet publish -c Release -o /app/out

# Final stage
FROM base AS final
WORKDIR /app
COPY --from=build /app/out .
ENTRYPOINT ["dotnet", "Backend.dll"]
