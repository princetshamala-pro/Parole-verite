import { ScrollView, Text, View, Pressable, FlatList, Alert, TextInput, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";

interface Sermon {
  id: string;
  title: string;
  author: string;
  date: string;
  content: string;
}

export default function AdminSermonsScreen() {
  const router = useRouter();
  const [sermons, setSermons] = useState<Sermon[]>([
    {
      id: "1",
      title: "La Grâce Divine",
      author: "Pasteur Jean",
      date: "2026-06-25",
      content: "Une méditation sur la grâce...",
    },
    {
      id: "2",
      title: "L'Amour du Prochain",
      author: "Pasteur Marie",
      date: "2026-06-24",
      content: "Comprendre l'amour du prochain...",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: "", author: "", content: "" });

  const handleAddSermon = () => {
    setEditingId(null);
    setFormData({ title: "", author: "", content: "" });
    setShowModal(true);
  };

  const handleEditSermon = (sermon: Sermon) => {
    setEditingId(sermon.id);
    setFormData({ title: sermon.title, author: sermon.author, content: sermon.content });
    setShowModal(true);
  };

  const handleSaveSermon = () => {
    if (!formData.title.trim() || !formData.author.trim() || !formData.content.trim()) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      return;
    }

    if (editingId) {
      setSermons(sermons.map(s => s.id === editingId ? { ...s, ...formData } : s));
    } else {
      const newSermon: Sermon = {
        id: Date.now().toString(),
        ...formData,
        date: new Date().toISOString().split("T")[0],
      };
      setSermons([newSermon, ...sermons]);
    }

    setShowModal(false);
    setFormData({ title: "", author: "", content: "" });
  };

  const handleDeleteSermon = (id: string) => {
    Alert.alert("Supprimer", "Êtes-vous sûr?", [
      { text: "Annuler", onPress: () => {} },
      {
        text: "Supprimer",
        onPress: () => setSermons(sermons.filter(s => s.id !== id)),
        style: "destructive",
      },
    ]);
  };

  const renderSermon = ({ item }: { item: Sermon }) => (
    <View className="mx-4 mb-3 p-4 rounded-lg border" style={{ backgroundColor: "#FFFFFF", borderColor: "#E0D5C7" }}>
      <View className="flex-row justify-between items-start mb-2">
        <View className="flex-1">
          <Text className="text-sm font-bold" style={{ color: "#2C2C2C" }}>
            {item.title}
          </Text>
          <Text className="text-xs mt-1" style={{ color: "#7A7A7A" }}>
            Par {item.author}
          </Text>
          <Text className="text-xs mt-1" style={{ color: "#7A7A7A" }}>
            {item.date}
          </Text>
        </View>
        <View className="flex-row gap-2">
          <Pressable onPress={() => handleEditSermon(item)} className="p-2">
            <MaterialIcons name="edit" size={18} color="#6B1D2B" />
          </Pressable>
          <Pressable onPress={() => handleDeleteSermon(item.id)} className="p-2">
            <MaterialIcons name="delete" size={18} color="#F44336" />
          </Pressable>
        </View>
      </View>
      <Text className="text-xs" style={{ color: "#7A7A7A" }}>
        {item.content.substring(0, 100)}...
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "left", "right"]}>
      {/* Header */}
      <View className="px-4 py-4 border-b flex-row justify-between items-center" style={{ borderColor: "#E0D5C7" }}>
        <View className="flex-row items-center gap-2">
          <Pressable onPress={() => router.back()} className="p-2">
            <MaterialIcons name="arrow-back" size={24} color="#6B1D2B" />
          </Pressable>
          <View>
            <Text className="text-lg font-bold" style={{ color: "#2C2C2C" }}>
              Prédications
            </Text>
            <Text className="text-xs" style={{ color: "#7A7A7A" }}>
              {sermons.length} prédications
            </Text>
          </View>
        </View>
        <Pressable onPress={handleAddSermon} className="p-2" style={{ backgroundColor: "#6B1D2B" }}>
          <MaterialIcons name="add" size={24} color="#FFFFFF" />
        </Pressable>
      </View>

      {/* Liste */}
      <FlatList
        data={sermons}
        renderItem={renderSermon}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 16, paddingBottom: 20 }}
        scrollEnabled={true}
      />

      {/* Modal d'édition */}
      <Modal visible={showModal} animationType="slide" transparent={true}>
        <SafeAreaView className="flex-1 bg-background">
          <View className="px-4 py-4 border-b flex-row justify-between items-center" style={{ borderColor: "#E0D5C7" }}>
            <Text className="text-lg font-bold" style={{ color: "#2C2C2C" }}>
              {editingId ? "Modifier" : "Ajouter"} une prédication
            </Text>
            <Pressable onPress={() => setShowModal(false)} className="p-2">
              <MaterialIcons name="close" size={24} color="#6B1D2B" />
            </Pressable>
          </View>

          <ScrollView className="flex-1 px-4 py-4">
            <Text className="text-sm font-semibold mb-2" style={{ color: "#2C2C2C" }}>
              Titre
            </Text>
            <TextInput
              placeholder="Titre de la prédication"
              value={formData.title}
              onChangeText={(text) => setFormData({ ...formData, title: text })}
              className="px-4 py-3 rounded-lg border mb-4"
              style={{ backgroundColor: "#FFFFFF", borderColor: "#E0D5C7", color: "#2C2C2C" }}
              placeholderTextColor="#7A7A7A"
            />

            <Text className="text-sm font-semibold mb-2" style={{ color: "#2C2C2C" }}>
              Auteur
            </Text>
            <TextInput
              placeholder="Nom du pasteur"
              value={formData.author}
              onChangeText={(text) => setFormData({ ...formData, author: text })}
              className="px-4 py-3 rounded-lg border mb-4"
              style={{ backgroundColor: "#FFFFFF", borderColor: "#E0D5C7", color: "#2C2C2C" }}
              placeholderTextColor="#7A7A7A"
            />

            <Text className="text-sm font-semibold mb-2" style={{ color: "#2C2C2C" }}>
              Contenu
            </Text>
            <TextInput
              placeholder="Contenu de la prédication"
              value={formData.content}
              onChangeText={(text) => setFormData({ ...formData, content: text })}
              className="px-4 py-3 rounded-lg border mb-4"
              style={{ backgroundColor: "#FFFFFF", borderColor: "#E0D5C7", color: "#2C2C2C", minHeight: 150 }}
              placeholderTextColor="#7A7A7A"
              multiline
              textAlignVertical="top"
            />

            <View className="flex-row gap-3 mt-6">
              <Pressable
                onPress={() => setShowModal(false)}
                className="flex-1 py-3 rounded-lg items-center border"
                style={{ backgroundColor: "#FFFFFF", borderColor: "#E0D5C7" }}
              >
                <Text className="text-sm font-bold" style={{ color: "#2C2C2C" }}>
                  Annuler
                </Text>
              </Pressable>
              <Pressable
                onPress={handleSaveSermon}
                className="flex-1 py-3 rounded-lg items-center"
                style={{ backgroundColor: "#6B1D2B" }}
              >
                <Text className="text-sm font-bold text-white">
                  Enregistrer
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}
