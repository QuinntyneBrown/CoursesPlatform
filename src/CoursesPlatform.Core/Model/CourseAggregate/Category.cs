namespace CoursesPlatform.Core;

public class Category
{
    public Guid CategoryId { get; private set; }

    public string Name { get; private set; } = string.Empty;

    public string? Description { get; private set; }

    public string Slug { get; private set; } = string.Empty;

    public Guid? ParentCategoryId { get; private set; }

    public Category? ParentCategory { get; private set; }

    public int DisplayOrder { get; private set; }

    public bool IsActive { get; private set; }

    public DateTime CreatedAt { get; private set; }

    private readonly List<Category> _subcategories = [];

    public IReadOnlyCollection<Category> Subcategories => _subcategories.AsReadOnly();

    private Category()
    {
    }

    public static Category Create(string name, string slug, string? description = null)
    {
        return new Category
        {
            CategoryId = Guid.NewGuid(),
            Name = name,
            Slug = slug,
            Description = description,
            IsActive = true,
            DisplayOrder = 0,
            CreatedAt = DateTime.UtcNow,
        };
    }

    public Category AddSubcategory(string name, string slug, string? description = null)
    {
        var subcategory = new Category
        {
            CategoryId = Guid.NewGuid(),
            Name = name,
            Slug = slug,
            Description = description,
            ParentCategoryId = CategoryId,
            ParentCategory = this,
            IsActive = true,
            DisplayOrder = _subcategories.Count,
            CreatedAt = DateTime.UtcNow,
        };
        _subcategories.Add(subcategory);
        return subcategory;
    }

    public void UpdateName(string name)
    {
        Name = name;
    }

    public void UpdateDescription(string? description)
    {
        Description = description;
    }

    public void UpdateSlug(string slug)
    {
        Slug = slug;
    }

    public void SetDisplayOrder(int order)
    {
        DisplayOrder = order;
    }

    public void Activate()
    {
        IsActive = true;
    }

    public void Deactivate()
    {
        IsActive = false;
    }
}
