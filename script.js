function analyzeText(){
    const text=document.getElementById("inputText").value;
    const letters=text.match(/[a-zA-Z]/g)?.length||0;
    const words = (text.match(/\b\w+\b/g) || []).length;
    const spaces=(text.match(/ /g)|| []).length;
    const lines = text.split(/\r\n|\r|\n/).filter(line => line.trim() !== '').length;

    const specialSymbols=(text.match(/[^a-zA-Z0-9\s]/g)||[]).length;
    const pronouns=['i', 'you', 'he', 'she', 'it','we','they','me','him','her','us','them'];
    const prepositions=['in','on','at','by','with','about','against','between','into','through','during','before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'for', 'of', 'off', 'over', 'under'];
    const articles=['a','an','the'];
    const wordArray=text.toLowerCase().match(/\b\w+\b/g)||[];
    const countByList=(list)=>{
        const counts={};
        list.forEach(item=>{
            const matches = wordArray.filter(word => word === item.toLowerCase());
            counts[item] = matches.length;
            counts[item]=matches?matches.length:0;

        });
        return counts;
    };
    function formatInlineCounts(obj) {
        return Object.entries(obj)
            .map(([key, val]) => `<li>${key}: ${val}</li>`) // Convert each entry to a list item
            .join(''); // Combine all list items into a string
    }
    const pronounCount=countByList(pronouns);
    const prepositionCount=countByList(prepositions);
    const articleCount=countByList(articles);
    let outputHTML=`
        <h3>Basic stats:</h3>
        <ul>
            <li>Letters:${letters}</li>
            <li>Words:${words}</li>
            <li>Spaces:${spaces}</li>
            <li>Lines:${lines}</li>
            <li>Special Symbols:${specialSymbols}</li>
        </ul>
        
        <div style="display: flex; gap: 40px; justify-content: start; flex-wrap: wrap;">
        <div>
            <h4>Pronouns</h4>
            <ol>${formatInlineCounts(pronounCount)}</ol>
        </div>
        <div>
            <h4>Prepositions</h4>
            <ol>${formatInlineCounts(prepositionCount)}</ol>
        </div>
        <div>
            <h4>Indefinite Articles</h4>
            <ol>${formatInlineCounts(articleCount)}</ol>
        </div>
        </div>
        
    `;
    document.getElementById("output").innerHTML = outputHTML;
}