import random
import json
import pickle
import numpy as np
import os

import nltk
from nltk.stem import WordNetLemmatizer

from tensorflow import keras
from keras.models import Sequential
from keras.layers import Dense, Activation, Dropout
from keras.optimizers import SGD

nltk.download("wordnet")
nltk.download("punkt")

lemmatizer = WordNetLemmatizer()

with open(os.path.join("data", "intents.json"), "r") as file:
    intents = json.load(file)

words = []
classes = []
documents = []
ignore_letters = ["?", "!", ".", ","]

# Categorizes patterns from each intent into tags
for intent in intents["intents"]:
    for pattern in intent["patterns"]:
        word_list = nltk.word_tokenize(pattern)
        words.extend(word_list)
        documents.append((word_list, intent["tag"]))
        if intent["tag"] not in classes:
            classes.append(intent["tag"])

# Stems each word
words = [lemmatizer.lemmatize(word) for word in words if word not in ignore_letters]
words = sorted(set(words))

# Gets rid of duplicates
classes = sorted(set(classes))

# Serializes words and classes
with open(os.path.join("data", "words.pkl"), "wb") as file:
    pickle.dump(words, file)
pickle.dump(classes, open("classes.pkl", "wb"))

# Template for target output during creation of the training data
training = []
output_empty = [0] * len(classes)

# Prepares training data, converts patterns into numerical representation
for document in documents:
    bag = []
    word_patterns = document[0]
    word_patterns = [lemmatizer.lemmatize(word.lower()) for word in word_patterns]
    for word in words:
        bag.append(1) if word in word_patterns else bag.append(0)

    output_row = list(output_empty)
    output_row[classes.index(document[1])] = 1
    training.append([bag, output_row])

# Shuffle training data, convert into NumPy array
random.shuffle(training)
training = np.array(training)

# Separates training data into input features and target labels
train_x = list(training[:, 0])
train_y = list(training[:, 1])

# Defines the architecture of the nueral network model with Keras
model = Sequential()
model.add(Dense(128, input_shape=(len(train_x[0]),), activation="relu"))
model.add(Dropout(0.5))
model.add(Dense(64, activation="relu"))
model.add(Dropout(0.5))
model.add(Dense(len(train_y[0]), activation="softmax"))

# Configures the model for training
sgd = SGD(lr=0.01, decay=1e-6, momentum=0.9, nesterov=True)
model.compile(loss="categorical_crossentropy", optimizer=sgd, metrics=["accuracy"])

# Trains the compiled model
hist = model.fit(
    np.array(train_x), np.array(train_y), epochs=200, batch_size=5, verbose=1
)

# Saves the model into a file and confirms that training is finished
model.save(os.path.join("models", "chatbotmodel.h5"), hist)
print("Finished training!")
