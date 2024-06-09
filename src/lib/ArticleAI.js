const TextCompletion = require("./gpt4all");

class ArticleAI{
    constructor(keyword){
        this.keyword = keyword
    }

    async create(){

        this.message = [
            { role: 'user', content: `you are expert in creating seo article that will rank on google. your task is to create article from this main keyword "${this.keyword}" with following specifications:
            Tone and Language: The tone should be friendly and the language should be English. 
            POV and Geographic Target: The article should be written from a neutral point of view and targeted at a US audience. 
            basic seo:
            - Focus Keyword should appear in the title.
            - Focus Keyword should in your SEO Meta Description.
            - Focus Keyword should appear at the beginning of your content.
            - Focus Keyword found in the content.
            additiona seo:
            - Focus Keyword should be found in subheading(s) like H2, H3, H4, etc..
            - Add placeholder keyword image with Focus Keyword as alt text.
            - Keyword Density at least 1%
            - Link out to external resources.
            - Add DoFollow links pointing to external resources.
            title readability:
            - Focus Keyword should appear at the beginning of SEO title.
            - title has a positive or a negative sentiment.
            - title should contain a power word. Add at least one.
            - use number in SEO title.
            content readability:
            - key takeaway
            - short paragraphs.
            - tables on each paragraphs if possible
            - quotes on each paragraphs if possible
            - images from unsplash
            - videos from youtube
            - Tips on each paragraphs if possible
            - Q&A as closing article
            formatting elements: italic, quotes, lists, & bold
            Output: Provide the following outputs:
            - SEO Title
            - SEO Description
            - Tags
            - Categories
            - Article Content: Markdown Format
            - The article should end with the author's name: "Fr4nk"
             
            NOTE: Please ensure that the generated article meets all the requirements of "content readability" and provides high-quality content.` }
        ]
        // this.message = [
        //     { role: 'user', content: `hi` }
        // ]
        const stream = true
        new TextCompletion(this.message, stream).run()
    }


}

module.exports = ArticleAI