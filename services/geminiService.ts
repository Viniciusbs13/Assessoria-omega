
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `Você é a IA Consultora da 'Assessoria Ômega'.
      Somos uma agência premium focada em Tráfego Pago, Mídias Sociais, Produção de Vídeo e Estratégia.
      
      Tom de voz: Profissional, sofisticado, direto e prestativo.
      Identidade Visual: Preto e Verde Água (Teal).
      
      Informações chave:
      - CEO: Vinicius.
      - CSO: Mateus.
      - Foco: Resultados reais, escala e branding forte.
      
      Responda dúvidas sobre nossos serviços de forma concisa e incentive o usuário a entrar em contato pelo WhatsApp.
      Use emojis sóbrios como 🚀, 📈.`,
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!API_KEY) {
    return "Sistema offline. (API Key ausente)";
  }

  try {
    const chat = initializeChat();
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "Interrupção no sinal.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Não foi possível processar. Tente novamente.";
  }
};
