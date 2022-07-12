import React, { useRef, useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
import { Task } from './TasksList';
import trashIcon from '../assets/icons/trash/trash.png';
import penIcon from '../assets/icons/pen/pen.png';
import Icon from 'react-native-vector-icons/Feather';

interface TaskItemProps {
  task: Task;
  index: number;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (taskId: number, newTaskTitle: string) => void;
}

export function TaskItem({ task, index, toggleTaskDone, removeTask, editTask }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [taskTitle, setTaskTitle] = useState(task.title);

  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  };

  function handleCancelEditing() {
    setTaskTitle(task.title);
    setIsEditing(false);
  };

  function handleSubmitEditing() {
    editTask(task.id, taskTitle);
    setIsEditing(false);
  };

  useEffect(() => {
    if (textInputRef.current) {
      if (!!isEditing) {
        textInputRef.current?.focus();
      } else {
        textInputRef.current?.blur();
      }
    }
  }, [isEditing]);

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View 
            testID={`marker-${index}`}
            style={!!task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            { task.done && (
              <Icon 
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput 
            value={taskTitle}
            onChangeText={setTaskTitle}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            style={!!task.done ? styles.taskTextDone : styles.taskText}
            ref={textInputRef}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonsContainer}>
        {!!isEditing ? (
          <TouchableOpacity
            onPress={handleCancelEditing}
          >
            <Icon 
              name="x"
              size={24}
              color="#b2b2b2"
            />
          </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleStartEditing}
            >
              <Image source={penIcon} />
            </TouchableOpacity>
          )
        }

        <View style={styles.buttonsDivider} />

        <TouchableOpacity
          testID={`trash-${index}`}
          style={{ opacity: !!isEditing ? .2 : 1 }}
          onPress={() => removeTask(task.id)}
          disabled={!!isEditing}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
    </View>
  </>
  )
};

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 80,
    marginHorizontal: 20
  },
  buttonsDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(196, 196, 196, .24)'
  },
})