import spacy
import unicodedata
import re
from spacy.matcher import PhraseMatcher
# Load the English language model
nlp = spacy.load('en_core_web_sm')

labels_1 = ['first slip',
 'leg slip',
 'short mid off',
 'silly mid off',
 'silly pointgully',
 'fourth slip',
 'third slip',
 'second slip',
 'first slip',
 'short leg',
 'silly mid on',
 'point',
 'cover point',
 'extra cover',
 'mid wicket',
 'mid off',
 'mid on',
 'fly slip',
 'backward point',
 'deep coversquare leg',
 'deep extra cover',
 'long off',
 'long on',
 'short fine leg',
 'third man',
 'sweeper',
 'cow corner',
 'fine leg',
 'long stop',
 'long leg',
 'deep backward square leg',
 'deep min wicket',
 'backfoot defend',
 'backfoot defend',
 'backfoot point',
 'covers',
 'cover point',
 'defend',
 'edge gully',
 'extra cover',
 'gully',
 'leg side',
 'mid off',
 'mid on',
 'mid wicket',
 'point',
 'short cover',
 'short fine leg',
 'square leg',
 'keeper',
 ]


labels_2 = ['1 run', '2 leg byes', '2 runs', '3 runs', '4 leg byes', '5 wides','four','leg bye','no ball','no run','six','wide','bowled','caught','lbw','run out']

from main.words import stopwords

def clean_and_tokenize_ngrams(text):
    # Apply spaCy pipeline for text processing
    new_text = text.lower().strip()

    # remove accented chars if there is any
    new_text = unicodedata.normalize('NFKD', new_text).encode('ascii', 'ignore').decode('utf-8', 'ignore')

    # remove extra empty lines
    new_text = re.sub(r'[\r|\n|\r\n]+', ' ',new_text)

    # remove special chars and 

    pattern = r'[^a-zA-z0-9\s]' #r'[^a-zA-z0-9\s]' # remove digits r'[^a-zA-z\s]'
    new_text = re.sub(pattern, '', new_text)
    doc = nlp(new_text)

    # Tokenize the text and remove stop words and punctuation
    tokens = [str(token.text) for token in doc if token.text not in stopwords and not token.is_punct]
    
    new_text2 = ' '.join(map(str,tokens))
    
    matcher = PhraseMatcher(nlp.vocab)
    matcher_2 = PhraseMatcher(nlp.vocab)
    n_grams_1 = labels_1
    n_grams_2 = labels_2
    
    patterns = [nlp.make_doc(ng) for ng in n_grams_1]

    # Add the patterns to the PhraseMatcher
    matcher.add("Ngrams", None, *patterns)

    # Apply the matcher on the text
    doc = nlp(new_text2)
    matches = matcher(doc)
    print("\n\n doc", doc)
    # Extract the matched n-grams
    ngram_list_1 = [doc[start:end].text for match_id, start, end in matches]

    patterns_2 = [nlp.make_doc(ng) for ng in n_grams_2]

    # Add the patterns to the PhraseMatcher
    matcher_2.add("Ngrams", None, *patterns_2)

    # Apply the matcher on the text
    matches_2 = matcher_2(doc)

    # Extract the matched n-grams
    ngram_list_2 = [doc[start:end].text for match_id, start, end in matches_2]


    print("\n text \n", new_text)
    print("\n ngrams \n", ngram_list_1, ngram_list_2)
    
    return {'label_1': list(set(ngram_list_1)), 'label_2': list(set(ngram_list_2))}


def getLabels(row):
    text = str(row['Default_Commentary']) + ' '+ str(row['Commentary']) 
    return clean_and_tokenize_ngrams(text) 
# Example usage

rows = [
    {
        "Default_Commentary": "47.5: Bilal Khan to Teja Nidamanuru, 2 runs.",
        "Commentary": "Goes full this time and at the stumps. Teja Nidamanuru\u00a0lofts this back over the bowler's head and they run quickly to pick up a brace.",
    },
    {
        "Default_Commentary": "47.4: Bilal Khan to Logan van Beek, Leg bye.",
        "Commentary": "In line with the stumps and bowled back of a length. Logan van Beek\u00a0looks to whip this away but misses and gets hit on the midriff. They steal a leg bye though.",
    },
    {
        "Default_Commentary": "43.5: Bilal Khan to Wesley Barresi, 1 run.",
        "Commentary": "In line with the stumps once again and on a fullish length. Wesley Barresi\u00a0inside edges this through square leg for a single.",
    },
    {
         "Default_Commentary": "42.4: Fayyaz Butt to Saqib Zulfiqar, Four!",
        "Commentary": "FOUR! Poor delivery from Fayyaz Butt\u00a0\u200b\u200b\u200b\u200band\u00a0Saqib Zulfiqar\u00a0helps himself to his first boundary! This is bowled back of a length and going down leg. Saqib Zulfiqar\u00a0glances this towards fine leg for four runs.",
    },
    {
         "Default_Commentary": "29.4: Fayyaz Butt to Vikramjit Singh, Four!",
        "Commentary": "FOUR! Vikramjit Singh\u00a0is now one hit away from a well-deserved century! Fayyaz Butt\u00a0comes 'round the wicket and bowls this short, outside off. Vikramjit Singh\u00a0pulls this towards deep mid-wicket and collects four runs. The effort from the fielder is in vain.",
    }
]

