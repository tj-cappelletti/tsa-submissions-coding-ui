using System.Net.Http.Headers;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Web;

var builder = WebApplication.CreateBuilder(args);

var apiBaseUrl = builder.Configuration["Api:BaseUrl"];

if (string.IsNullOrEmpty(apiBaseUrl))
{
    throw new InvalidOperationException("The configuration key 'Api:BaseUrl' is missing or empty.");
}

var token = builder.Configuration["Api:Token"];

if (string.IsNullOrEmpty(token))
{
    throw new InvalidOperationException("The configuration key 'Api:Token' is missing or empty.");
}

builder.Services.AddScoped(sp =>
{
    var httpClient = new HttpClient
    {
        BaseAddress = new Uri(apiBaseUrl)
    };

    httpClient.DefaultRequestHeaders.Add("X-API-Key", token);

    return httpClient;
});

builder.Services.AddHttpContextAccessor();

builder.Services.AddRazorPages();
builder.Services.AddServerSideBlazor();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseRouting();

app.MapBlazorHub();
app.MapFallbackToPage("/_Host");

app.Run();
