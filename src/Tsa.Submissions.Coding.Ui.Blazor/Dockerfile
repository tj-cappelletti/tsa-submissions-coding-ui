#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["Tsa.Submissions.Coding.Ui.Blazor/Tsa.Submissions.Coding.Ui.Blazor.csproj", "Tsa.Submissions.Coding.Ui.Blazor/"]
RUN dotnet restore "Tsa.Submissions.Coding.Ui.Blazor/Tsa.Submissions.Coding.Ui.Blazor.csproj"
COPY . .
WORKDIR "/src/Tsa.Submissions.Coding.Ui.Blazor"
RUN dotnet build "Tsa.Submissions.Coding.Ui.Blazor.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Tsa.Submissions.Coding.Ui.Blazor.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Tsa.Submissions.Coding.Ui.Blazor.dll"]