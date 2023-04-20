using System.Text.Json;
using Tsa.Submissions.Coding.Ui.Blazor.Models;

namespace Tsa.Submissions.Coding.Ui.Blazor.Services;

public class ProblemsService
{
    private readonly IHttpClientFactory _clientFactory;
    private readonly string _apiBaseUrl;

    public ProblemsService(IConfiguration configuration, IHttpClientFactory clientFactory)
    {
        _clientFactory = clientFactory;
        _apiBaseUrl = configuration.GetSection("ApiUrl").Value;
    }

    public async Task<List<ProblemModel>> GetAsync()
    {
        var result = new List<ProblemModel>();

        var url = $"{_apiBaseUrl}/api/problems";

        var request = new HttpRequestMessage(HttpMethod.Get, url);

        var client = _clientFactory.CreateClient();

        var response = await client.SendAsync(request);

        if (response.IsSuccessStatusCode)
        {
            var stringResponse = await response.Content.ReadAsStringAsync();

            result = JsonSerializer.Deserialize<List<ProblemModel>>(stringResponse,
                new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase });
        }
        else
        {
            result = Array.Empty<ProblemModel>().ToList();
        }

        return result;
    }

    public async Task<ProblemModel?> GetAsync(string id)
    {
        var url = $"{_apiBaseUrl}/api/problems/{id}";

        var request = new HttpRequestMessage(HttpMethod.Get, url);

        var client = _clientFactory.CreateClient();

        var response = await client.SendAsync(request);

        if (!response.IsSuccessStatusCode) return null;

        var stringResponse = await response.Content.ReadAsStringAsync();

        var result = JsonSerializer.Deserialize<ProblemModel>(stringResponse,
            new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase });

        return result;
    }
}