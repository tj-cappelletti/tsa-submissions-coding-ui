namespace Tsa.Submissions.Coding.Ui.Models;

public class TestSetResult
{
    public bool Passed { get; set; }

    public TimeSpan? RunDuration { get; set; }

    public string? TestSetId { get; set; }
}
