import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: '#F9F4E2', 
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 50,
    textAlign: 'center',
    marginBottom: 10,
  },
  image: {
    width: 170,
    height: 170,
    marginBottom: 20,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  
  emotionButtonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 13,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 15,
    marginBottom: 20,
    backgroundColor: '#FFD700', // Fondo claro para distinguir el contenedor
  },
  buttonRow: {
    flexDirection: 'row',
    marginBottom: 7,
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 13,
    paddingVertical: 6,
    marginHorizontal: 5,
    marginBottom: 10,
    borderRadius: 15,
  },
  buttonText: {
    color: '#000',
  },
  descriptionContainer: {
    backgroundColor: '#FFD700',
    padding: 10,
    borderRadius: 15,
    width: '100%', // Asegurar que el contenedor use todo el ancho posible
    marginBottom: 100, // Añadir margen inferior para separación
  },
  textInput: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 15,
    paddingHorizontal : 50,
    marginTop: 10, // Separación entre el título "Descripción" y el campo de entrada
    height: 100, // Altura para el campo de entrada multiline
    verticalAlign: 'top', // Alinear el texto en la parte superior del campo
  },
});
