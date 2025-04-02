import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

export default function SecurityCompanyList() {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const url = search
        ? `${process.env.REACT_APP_API_URL || "http://localhost:5000"}/companies?keyword=${encodeURIComponent(search)}`
        : `${process.env.REACT_APP_API_URL || "http://localhost:5000"}/companies`;
      const res = await fetch(url);
      const data = await res.json();
      setCompanies(data);
    };
    fetchData();
  }, [search]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Hungarian Cybersecurity Companies
      </h1>
      <Input
        placeholder="Search by name, focus area..."
        className="mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ScrollArea className="h-[70vh] rounded-md border">
        <div className="grid md:grid-cols-2 gap-4 p-4">
          {companies.map((company, i) => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <Card className="hover:shadow-xl transition-shadow">
                <CardContent className="p-4 space-y-2">
                  <h2 className="text-xl font-semibold">
                    {company.name}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {company.description?.slice(0, 160)}...
                  </p>
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm underline"
                  >
                    Visit Website
                  </a>
                  {company.contact && (
                    <p className="text-sm text-muted-foreground">
                      Contact: {company.contact}
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

