import { MessageCircle, X, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function FloatingAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<
    Array<{ role: "user" | "assistant"; text: string }>
  >([
    {
      role: "assistant",
      text: "Hey! I'm here to help you find the perfect phone. Ask me anything in plain English!",
    },
  ]);
  const [input, setInput] = useState("");

  const quickActions = [
    "Explain plans in simple English",
    "Translate telco jargon",
    "Compare iPhone vs Samsung",
    "What's 5G?",
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([...messages, { role: "user", text: input }]);

    // Mock AI response
    setTimeout(() => {
      const response =
        input.toLowerCase().includes("plan") ||
        input.toLowerCase().includes("jargon")
          ? "Sure! A 'plan' is basically how much data, calls, and texts you get each month. The higher the price, the more data you usually get. Need help picking one?"
          : input.toLowerCase().includes("compare")
          ? "iPhones are great for camera quality and ecosystem (works well with Mac/iPad). Samsung has more customization and usually better battery life. Both are solid! What matters most to you?"
          : "Great question! Let me help you with that. What specific aspect would you like to know more about?";

      setMessages((prev) => [...prev, { role: "assistant", text: response }]);
    }, 1000);

    setInput("");
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#00A9CE] hover:bg-[#0098b8] text-white rounded-full shadow-lg flex items-center justify-center z-50 transition-all hover:scale-110"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-[380px] bg-white rounded-2xl shadow-2xl border border-border z-50 flex flex-col max-h-[600px]">
      {/* Header */}
      <div className="bg-[#00A9CE] text-white p-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-white">AI Assistant</h4>
            <p className="text-xs text-white/80">Here to help 24/7</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="hover:bg-white/20 rounded-full p-1 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-2xl ${
                msg.role === "user"
                  ? "bg-[#00A9CE] text-white"
                  : "bg-secondary text-foreground"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
            </div>
          </div>
        ))}

        {/* Quick Actions */}
        {messages.length <= 1 && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Quick actions:</p>
            {quickActions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInput(action);
                  handleSend();
                }}
                className="block w-full text-left text-sm p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                {action}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask me anything..."
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            size="icon"
            className="bg-[#00A9CE] hover:bg-[#0098b8]"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
