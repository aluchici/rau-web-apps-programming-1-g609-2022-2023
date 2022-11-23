print("Hello, world!")

a = 10

# if (a > 10) {
#   cod
# }

# if a > 10:
#     print(a)
#     print("Done")

#     if True:
#         print("Inside")

#     print("Done din nou")

b = 10.3
c = "string1"
d = 'string2'
e = """string 3
multiline"""

# `${}`
f = f"This is a string with a variable, a = {a}"

g = c.upper()
print(g)

l1 = [[1, "a", "b"], 1, 2, 3, 4, "string1", "string2"]
l1[1] = 10
print(l1)
# print(l1[4].upper())

l1.append("new element")
l1.append([1, 2, 3, 4])
l1.append(a)

print(l1)
l1.extend([1, 2, 3, 4, 5, 6, 7, 8, 10])

print(l1)

l1[0].append("c")
l1[0][1] = "d"
l1[-1] = [7, 8, 9]
l1[-1][0] = [1, 2, 3]
print(l1)

l1[-1][0][-1] = 10
print(l1)

stack = []
stack.append(12)
stack.append(25)
a = stack.pop()
print(a)

t1 = (1, 2, 3, 4, 5, ["a", "b"])
t1[-1][0] = 10

l2 = list(l1) 
print(l1[0], l2[0])

l2[0] = "noua lista"

print(l1[0], l2[0])

l1 = [1, 2, 1, 1, 1, 2, 43, 5, 3, 2, 2]
s1 = set(l1)
print(len(s1), s1)

user = {
    "nume": {
        "nume": "A",
        "prenume": "B"
    },
    "adresa": {
        "strada": "S",
        "postcode": "3333",
        "oras": "B"
    },
    "tranzactii": [
        {
            "suma": 100,
            "data": "2022-10-22"
        },
        {
            "suma": 20,
            "data": "2022-11-24"
        }
    ]
}

user["nume"]
user["adresa"]["oras"] = "A"

max_t = 0
for tranzactie in user["tranzactii"]:
    if tranzactie["suma"] > max_t:
        max_t = tranzactie["suma"]
print(max_t)