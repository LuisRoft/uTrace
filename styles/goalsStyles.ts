import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 40, // Ajusta este valor según sea necesario para posicionar más abajo
  },
  inner: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000', // Asegura que el texto "Objetivos" sea negro
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
  },
  headerButtons: {
    flexDirection: 'row',
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6200EE',
    borderRadius: 50,
    width: 50,
    height: 50,
    marginRight: 10,
  },
  deleteButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF0000',
    borderRadius: 50,
    width: 50,
    height: 50,
  },
  modalButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalAddButton: {
    marginTop: 10,
    height: 40,
    borderRadius: 5,
    backgroundColor: '#6200EE',
  },
  backButton: {
    marginTop: 10,
    height: 40,
    borderRadius: 5,
    backgroundColor: '#888',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  goalTypeButton: {
    backgroundColor: '#6200EE',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  goalTypeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  selectedGoalType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6200EE',
    marginBottom: 10,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
  },
  closeButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#6200EE',
    fontSize: 16,
  },
  goalContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 5,
  },
  goalText: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  goalDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  goalDate: {
    fontSize: 12,
    color: '#888',
    marginBottom: 10,
  },
  markButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
    marginRight: 10, // Añadimos margen derecho para separar los botones
  },
  markButtonFail: {
    backgroundColor: '#F44336', // Color rojo para el botón "✗"
  },
  markButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});
