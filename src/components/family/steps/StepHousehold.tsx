import { useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Card } from "../../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { useFamilyStore, HouseholdMember } from "../../../stores/familyStore";
import { Plus, X } from "lucide-react";
import { z } from "zod";

const householdSchema = z.object({
  numberOfMembers: z.number().min(2).max(10),
  members: z.array(
    z.object({
      name: z.string().min(1),
      age: z.number().min(0).max(120),
      role: z.enum(["parent", "teen", "kid"]),
    })
  ).min(1),
});

interface StepHouseholdProps {
  onNext: () => void;
}

export function StepHousehold({ onNext }: StepHouseholdProps) {
  const { household, setHousehold } = useFamilyStore();
  const [members, setMembers] = useState<HouseholdMember[]>(
    household.members.length > 0
      ? household.members
      : [
          { id: "1", name: "", age: 0, role: "parent" },
          { id: "2", name: "", age: 0, role: "kid" },
        ]
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const addMember = () => {
    setMembers([
      ...members,
      { id: Date.now().toString(), name: "", age: 0, role: "kid" },
    ]);
  };

  const removeMember = (id: string) => {
    if (members.length > 1) {
      setMembers(members.filter((m) => m.id !== id));
    }
  };

  const updateMember = (id: string, field: keyof HouseholdMember, value: any) => {
    setMembers(
      members.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const handleNext = () => {
    const validation = householdSchema.safeParse({
      numberOfMembers: members.length,
      members: members.map((m) => ({
        name: m.name,
        age: m.age,
        role: m.role,
      })),
    });

    if (!validation.success) {
      const newErrors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0]) {
          newErrors[err.path[0].toString()] = err.message;
        }
      });
      setErrors(newErrors);
      return;
    }

    setHousehold({
      numberOfMembers: members.length,
      members,
      existingDevices: household.existingDevices,
    });
    onNext();
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Tell Us About Your Household</h2>
        <p className="text-muted-foreground">
          We'll personalize your plan based on your family size and needs.
        </p>
      </div>

      <div className="space-y-4">
        {members.map((member, index) => (
          <Card key={member.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-semibold">Family Member {index + 1}</h3>
              {members.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeMember(member.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor={`name-${member.id}`}>Name</Label>
                <Input
                  id={`name-${member.id}`}
                  value={member.name}
                  onChange={(e) =>
                    updateMember(member.id, "name", e.target.value)
                  }
                  placeholder="Enter name"
                />
                {errors[`members.${index}.name`] && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors[`members.${index}.name`]}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor={`age-${member.id}`}>Age</Label>
                <Input
                  id={`age-${member.id}`}
                  type="number"
                  min="0"
                  max="120"
                  value={member.age || ""}
                  onChange={(e) =>
                    updateMember(member.id, "age", parseInt(e.target.value) || 0)
                  }
                  placeholder="Age"
                />
                {errors[`members.${index}.age`] && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors[`members.${index}.age`]}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor={`role-${member.id}`}>Role</Label>
                <Select
                  value={member.role}
                  onValueChange={(value: "parent" | "teen" | "kid") =>
                    updateMember(member.id, "role", value)
                  }
                >
                  <SelectTrigger id={`role-${member.id}`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="parent">Parent</SelectItem>
                    <SelectItem value="teen">Teen (13-17)</SelectItem>
                    <SelectItem value="kid">Kid (under 13)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        ))}

        <Button
          variant="outline"
          onClick={addMember}
          className="w-full"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Another Family Member
        </Button>
      </div>

      <div className="flex justify-end mt-8">
        <Button
          size="lg"
          className="bg-[#00A9CE] hover:bg-[#0098b8] text-white px-8"
          onClick={handleNext}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

