import { Linkedin, Globe, PlusIcon, Cross, X, Save } from "lucide-react";
import Block from "./ui/Block";
import { Input } from "./ui/input";
import { Highlight } from "./ui/highlight";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { toast } from "sonner";

export default function BioBlock({
  linkedinURL,
  setLinkedinURL,
  portfolioURL,
  setPortfolioURL,
  setBio,
  setJobRole,
  setExperience,
  setSkills,
}: {
  linkedinURL?: string;
  setLinkedinURL: (url: string) => void;
  portfolioURL?: string;
  setPortfolioURL: (url: string) => void;
  setBio: (bio: string) => void;
  setJobRole: (role: string) => void;
  setExperience: (exp: string) => void;
  setSkills: (skills: string[]) => void;
}) {
  const [skillInput, setSkillInput] = useState("");
  const [skillSet, setSkillSet] = useState<string[]>([]);
  const [exp, setExp] = useState("");
  const [role, setRole] = useState("");
  const [bioText, setBioText] = useState("");

  const handleAddSkill = () => {
    if (skillInput.trim() !== "" && !skillSet.includes(skillInput.trim())) {
      setSkillSet([...skillSet, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkillSet(skillSet.filter((skillSet) => skillSet !== skillToRemove));
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setExperience(exp);
    setJobRole(role);
    setBio(bioText);
    setSkills(skillSet);
    toast.success("Profile updated successfully !");
  };

  return (
    <>
      <div className="col-span-12 sm:col-span-6 md:col-span-3 space-y-4">
        <Block className="bg-gradient-to-br from-blue-500 to-purple-600 h-[200px]">
          <div className="grid h-full place-content-center text-3xl text-white">
            <Linkedin size={18} className="w-6 h-6 absolute top-2 left-2" />
            <h1 className="text-2xl font-bold mx-auto mb-2 text-blue-200">
              LinkedIn Username
            </h1>
            <Input
              className="w-full mt-2 focus-visible:ring-blue-700 placeholder:text-gray-200 bg-transparent border border-blue-200/50 text-secondary ring-offset-blue-500"
              placeholder="Enter your username"
              value={linkedinURL}
              onChange={(e) => setLinkedinURL(e.target.value)}
            />
          </div>
        </Block>

        <Block className="bg-gradient-to-br from-gray-50 to-gray-600 h-[200px]">
          <div className="grid h-full place-content-center text-3xl text-white py-4">
            <Globe
              size={18}
              className="w-5 h-5 absolute top-2 left-2 text-gray-500"
            />
            <h1 className="text-2xl font-bold mx-auto mb-2 text-gray-800">
              Your Website URL
            </h1>
            <Input
              className="w-full mt-2 focus-visible:ring-gray-700 placeholder:text-gray-100 bg-transparent text-white border-gray-700/50 ring-offset-gray-500"
              placeholder="Enter your website url"
              type="url"
              value={portfolioURL}
              onChange={(e) => setPortfolioURL(e.target.value)}
            />
          </div>
        </Block>
      </div>

      <Block className="col-span-12 md:col-span-9 relative bg-secondary">
        {/* A badge */}
        <h1 className="mb-4 text-3xl sm:text-4xl font-bold sm:leading-normal">
          Tell more about <Highlight>Yourself !</Highlight>
        </h1>
        <form
          className="space-y-6"
          onSubmit={(e) => {
            handleSave(e);
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="experience"
                  className="block text-sm font-medium text-gray-100 mb-1"
                >
                  Experience (years)
                </label>
                <Input
                  id="experience"
                  type="number"
                  value={exp}
                  onChange={(e) => setExp(e.target.value)}
                  placeholder="Years of experience"
                  className="w-full bg-transparent border border-gray-500 ring-offset-secondary"
                />
              </div>
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-100 mb-1"
                >
                  Current Role
                </label>
                <Input
                  id="role"
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Software Engineer"
                  className="w-full bg-transparent border border-gray-500 ring-offset-secondary"
                />
              </div>
            </div>
            <div className="h-full">
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-100 mb-1"
              >
                Bio
              </label>
              <Textarea
                id="bio"
                value={bioText}
                onChange={(e) => setBioText(e.target.value)}
                placeholder="Tell us about yourself"
                rows={4}
                className="w-full resize-none bg-transparent outline-white border border-gray-700"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="skills"
                className="block text-sm font-medium text-gray-100 mb-1"
              >
                Skills
              </label>
              <div className="flex space-x-2">
                <Input
                  id="skills"
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  placeholder="Add a skill"
                  className="flex-grow bg-transparent border border-gray-500 ring-offset-secondary"
                  onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
                />
                <Button onClick={handleAddSkill} size="icon" type="button">
                  <PlusIcon className="h-4 w-4" />
                </Button>
              </div>

              <Button type="submit" className="w-full mt-4">
                Save <Save className="h-4 w-4 ml-2" />
              </Button>
            </div>
            <ScrollArea className="h-40 w-full rounded-md border -mt-8">
              <h1 className="text-sm font-medium text-gray-100 p-2">
                Your Skills{" "}
                <span className="text-xs opacity-60 text-green-400">
                  ( {skillSet.length} )
                </span>
              </h1>
              <div className="flex flex-wrap gap-2 p-2">
                {skillSet.map((skillSet) => (
                  <Badge
                    key={skillSet}
                    className="flex items-center justify-start px-2 py-1 bg-gradient-to-br from-green-400 to-blue-500 w-fit"
                  >
                    <span className="truncate">{skillSet}</span>
                    <button
                      onClick={() => handleRemoveSkill(skillSet)}
                      className="ml-2 text-xs opacity-60 hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4 font-bold text-white" />
                    </button>
                  </Badge>
                ))}
              </div>
            </ScrollArea>
          </div>
        </form>
      </Block>
    </>
  );
}
