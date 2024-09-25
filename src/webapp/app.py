from flask import Flask, request, jsonify
import rospy
from geometry_msgs.msg import Twist

app = Flask(__name__)

# Initialize ROS node and publisher
rospy.init_node('robot_web_controller', anonymous=True)
pub = rospy.Publisher('/cmd_vel', Twist, queue_size=10)


def move_robot(linear_x, angular_z):
    twist = Twist()
    twist.linear.x = linear_x
    twist.angular.z = angular_z
    pub.publish(twist)


@app.route('/move', methods=['POST'])
def move():
    data = request.json
    command = data['command']

    # Mapping keys to actions
    if command == 'i':  # Forward
        move_robot(0.5, 0.0)
    elif command == 'j':  # Left
        move_robot(0.0, 0.5)
    elif command == 'l':  # Right
        move_robot(0.0, -0.5)
    elif command == 'k':  # Stop
        move_robot(0.0, 0.0)
    elif command == 'm':  # Backward
        move_robot(-0.5, 0.0)

    return jsonify(success=True)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
