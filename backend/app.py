from flask import Flask, jsonify, request
import json

app = Flask(__name__)

with open("companies.json", "r", encoding="utf-8") as f:
    companies = json.load(f)

@app.route("/companies", methods=["GET"])
def get_companies():
    keyword = request.args.get("keyword")
    if keyword:
        filtered = [c for c in companies if keyword.lower() in c["name"].lower()]
        return jsonify(filtered)
    return jsonify(companies)

@app.route("/companies/<int:company_id>", methods=["GET"])
def get_company(company_id):
    for c in companies:
        if c["id"] == company_id:
            return jsonify(c)
    return jsonify({"error": "Company not found"}), 404

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
