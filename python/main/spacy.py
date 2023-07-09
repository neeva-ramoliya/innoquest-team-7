import spacy
import unicodedata
import re
from spacy.matcher import PhraseMatcher
# Load the English language model
nlp = spacy.load('en_core_web_sm')

labels_1 = [
 'deep cover',
 'deep extra cover',
 'deep backward square leg',
 'deep square leg',
 'deep midwicket',
 'deep mid wicket',
 'short fine leg',
 'cover point',
 'first slip',
 'leg slip',
 'short mid off',
 'silly mid off',
 'silly point',
 'fourth slip',
 'third slip',
 'second slip',
 'short leg',
 'silly mid on',
 'backward point',
 'point',
 'extra cover',
 'mid wicket',
 'bowlers head',
 'mid off',
 'mid on',
 'fly slip',
 'long off',
 'long on',
 'third man',
 'sweeper',
 'cow corner',
 'fine leg',
 'long stop',
 'long leg',
 'covers',
 'extra cover',
 'gully',
 'mid off',
 'mid on',
 'mid wicket',
 'point',
 'short cover',
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
    
    return {'ball_position': list(set(ngram_list_1)), 'result': list(set(ngram_list_2))}


def getLabels(row):
    text = str(row['Default_Commentary']) + ' '+ str(row['Commentary']) 
    return clean_and_tokenize_ngrams(text) 
# Example usage

