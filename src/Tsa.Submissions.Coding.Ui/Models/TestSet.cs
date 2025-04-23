namespace Tsa.Submissions.Coding.Ui.Models;

public class TestSet
{
    public string? Id { get; set; }

    public IList<TestSetValue>? Inputs { get; set; }

    public bool IsPublic { get; set; }

    public string? Name { get; set; }

    public string? ProblemId { get; set; }
}
