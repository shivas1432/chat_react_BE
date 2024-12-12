let messages = [
    { id: 1, text: "How your noget ye you can't you?", sender: 'other' },
    { id: 2, text: "What meaning? He enerte to anoget tyouare.", sender: 'self' },
  ];
  
  exports.getChats = (req, res) => {
    res.json(messages);
  };
  
  exports.sendMessage = (req, res) => {
    const { text, sender } = req.body;
    const newMessage = { id: messages.length + 1, text, sender };
    messages.push(newMessage);
    res.json(newMessage);
  };
  