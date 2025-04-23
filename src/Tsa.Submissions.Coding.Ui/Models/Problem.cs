namespace Tsa.Submissions.Coding.Ui.Models;

public class Problem
{
    public string? Description { get; set; }

    public string? Id { get; set; }

    public bool IsActive { get; set; }

    public IList<TestSet>? TestSets { get; set; }

    public string? Title { get; set; }
}
