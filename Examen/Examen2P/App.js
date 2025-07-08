import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';

const App = () => {
  const [foodType, setFoodType] = useState('');
  const [city, setCity] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  // Foursquare API key - consider using environment variables in production
  const API_KEY = 'fsq3ATzZbmzZQ8LC6mQxF5YfuSvZukuCkV/kPklBEeSLVsE=';

  const searchRestaurants = async () => {
    if (!foodType.trim() || !city.trim()) {
      Alert.alert('Error', 'Please enter both food type and city');
      return;
    }

    try {
      setLoading(true);
      setRestaurants([]);
      setSelectedRestaurant(null);

      // For web compatibility, we'll use a CORS proxy if needed
      const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
      const apiUrl = `https://api.foursquare.com/v3/places/search?query=${encodeURIComponent(foodType)}&near=${encodeURIComponent(city)}&limit=10`;
      
      const response = await fetch(Platform.OS === 'web' ? proxyUrl + apiUrl : apiUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': API_KEY,
          // For web, we need to add these headers for CORS
          ...(Platform.OS === 'web' && {
            'Origin': window.location.origin,
            'X-Requested-With': 'XMLHttpRequest'
          })
        }
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch data');
      }

      if (data.results && data.results.length > 0) {
        const venues = data.results.map(result => ({
          id: result.fsq_id,
          name: result.name,
          rating: result.rating,
          distance: result.distance,
          image: result.photos && result.photos.length > 0 
            ? `${result.photos[0].prefix}original${result.photos[0].suffix}` 
            : 'https://placehold.co/600x400?text=Restaurant+Image',
          location: result.location,
          tel: result.tel,
        }));
        setRestaurants(venues);
      } else {
        Alert.alert('No results', 'No restaurants found with your criteria');
      }
    } catch (error) {
      console.error('API Error:', error);
      Alert.alert('Error', error.message || 'Failed to fetch restaurants. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatDistance = (meters) => {
    if (!meters) return 'N/A';
    return meters < 1000 
      ? `${Math.round(meters)} m` 
      : `${(meters / 1000).toFixed(1)} km`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🍽️ Restaurant Finder</Text>
        <Text style={styles.subtitle}>Discover great places to eat</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="What are you craving? (sushi, pizza)"
          placeholderTextColor="#999"
          value={foodType}
          onChangeText={setFoodType}
          accessibilityLabel="Type of food you want to eat"
        />
        <TextInput
          style={styles.input}
          placeholder="Where? (Guadalajara)"
          placeholderTextColor="#999"
          value={city}
          onChangeText={setCity}
          accessibilityLabel="City where you want to search"
        />
        
        <TouchableOpacity 
          style={[styles.searchButton, (loading || !foodType || !city) && styles.searchButtonDisabled]} 
          onPress={searchRestaurants}
          disabled={loading || !foodType || !city}
          accessibilityLabel="Search restaurants"
        >
          <Text style={styles.searchButtonText}>
            {loading ? 'Searching...' : 'Find Restaurants'}
          </Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B6B" />
          <Text style={styles.loadingText}>Finding the best spots for you...</Text>
        </View>
      ) : selectedRestaurant ? (
        <View style={styles.detailsWrapper}>
          <ScrollView style={styles.detailsContainer}>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => setSelectedRestaurant(null)}
              accessibilityLabel="Go back to results"
            >
              <Text style={styles.backButtonText}>← Back to results</Text>
            </TouchableOpacity>
            
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: selectedRestaurant.image }}
                style={styles.restaurantImage}
                resizeMode="cover"
                defaultSource={require('./assets/placeholder.png')} // You would need this asset
                accessibilityLabel={`Image of ${selectedRestaurant.name}`}
              />
            </View>
            
            <View style={styles.detailsContent}>
              <Text style={styles.restaurantName}>{selectedRestaurant.name}</Text>
              
              <View style={styles.ratingContainer}>
                <View style={styles.ratingPill}>
                  <Text style={styles.ratingText}>
                    {selectedRestaurant.rating ? `${selectedRestaurant.rating} ★` : 'No rating'}
                  </Text>
                </View>
                <Text style={styles.distanceText}>
                  {formatDistance(selectedRestaurant.distance)} away
                </Text>
              </View>
              
              <View style={styles.infoSection}>
                <Text style={styles.sectionTitle}>📍 Address</Text>
                <Text style={styles.infoText}>
                  {selectedRestaurant.location.address || 'Address not available'}
                </Text>
              </View>
              
              {selectedRestaurant.tel && (
                <View style={styles.infoSection}>
                  <Text style={styles.sectionTitle}>📞 Phone</Text>
                  <Text style={styles.infoText}>{selectedRestaurant.tel}</Text>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      ) : (
        <View style={styles.resultsWrapper}>
          <ScrollView 
            style={styles.resultsContainer}
            contentContainerStyle={styles.resultsContentContainer}
          >
            {restaurants.length === 0 && !loading && (
              <View style={styles.emptyState}>
                <Image
                  source={{ uri: 'https://placehold.co/300x200?text=Search+for+restaurants' }}
                  style={styles.emptyImage}
                  accessibilityLabel="Search for restaurants"
                />
                <Text style={styles.emptyText}>Search for restaurants in your city</Text>
              </View>
            )}
            
            {restaurants.map((restaurant) => (
              <TouchableOpacity
                key={restaurant.id}
                style={styles.restaurantCard}
                onPress={() => setSelectedRestaurant(restaurant)}
                accessibilityLabel={`View details for ${restaurant.name}`}
              >
                <View style={styles.cardImageContainer}>
                  <Image
                    source={{ uri: restaurant.image }}
                    style={styles.cardImage}
                    resizeMode="cover"
                    defaultSource={require('./assets/placeholder.png')} // You would need this asset
                    accessibilityLabel={`Image of ${restaurant.name}`}
                  />
                </View>
                
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle} numberOfLines={1}>{restaurant.name}</Text>
                  
                  <View style={styles.cardDetails}>
                    <View style={styles.smallRatingPill}>
                      <Text style={styles.smallRatingText}>
                        {restaurant.rating ? `${restaurant.rating} ★` : 'No rating'}
                      </Text>
                    </View>
                    <Text style={styles.cardDistance}>
                      {formatDistance(restaurant.distance)}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F9',
    paddingTop: Platform.OS === 'web' ? 20 : 40,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6B6B',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 5,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#EEE',
    color: '#333',
    ...Platform.select({
      web: {
        outlineStyle: 'none', // Remove blue outline on web
      },
    }),
  },
  searchButton: {
    backgroundColor: '#FF6B6B',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
  },
  searchButtonDisabled: {
    backgroundColor: '#CCC',
  },
  searchButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#888',
  },
  resultsWrapper: {
    flex: 1,
    paddingHorizontal: 10,
  },
  resultsContainer: {
    flex: 1,
  },
  resultsContentContainer: {
    paddingBottom: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyImage: {
    width: 200,
    height: 150,
    marginBottom: 20,
    borderRadius: 10,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
  restaurantCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    flexDirection: 'row',
    height: 100,
    marginHorizontal: 10,
  },
  cardImageContainer: {
    width: 100,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  cardDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  smallRatingPill: {
    backgroundColor: '#FFF2E6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  smallRatingText: {
    fontSize: 12,
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
  cardDistance: {
    fontSize: 12,
    color: '#888',
  },
  detailsWrapper: {
    flex: 1,
  },
  detailsContainer: {
    flex: 1,
  },
  backButton: {
    padding: 15,
    paddingBottom: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#FF6B6B',
    fontWeight: '600',
  },
  imageContainer: {
    height: 200,
  },
  restaurantImage: {
    width: '100%',
    height: '100%',
  },
  detailsContent: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    paddingTop: 30,
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'center',
  },
  ratingPill: {
    backgroundColor: '#FFF2E6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  ratingText: {
    fontSize: 16,
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
  distanceText: {
    fontSize: 16,
    color: '#888',
  },
  infoSection: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#FF6B6B',
  },
  infoText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
});

export default App;
