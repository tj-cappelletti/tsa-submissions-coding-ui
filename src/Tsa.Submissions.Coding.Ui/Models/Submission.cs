namespace Tsa.Submissions.Coding.Ui.Models;

public class Submission
{
    public string? Id { get; set; }

    public bool IsFinalSubmission { get; set; }

    public string? Language { get; set; }

    public string? ProblemId { get; set; }

    public string? Solution { get; set; }

    public DateTime? SubmittedOn { get; set; }

    public string? TeamId { get; set; }

    public IList<TestSetResult>? TestSetResults { get; set; }

    public string? Result
    {
        get
        {
            if (TestSetResults == null || TestSetResults.Count == 0)
            {
                return "Pending";
            }

            if (TestSetResults.All(x => x.Passed))
            {
                return "Passed";
            }

            if (TestSetResults.Any(x => x.Passed))
            {
                return "Partially Passed";
            }

            return "Failed";
        }
    }
}
